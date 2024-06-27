const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
});

const objectTypeId = '2-31564332'
const pipelineId = '9239509'



exports.main = async (event, callback) => {
  console.log("hola")
  async function fetchPipelineData() {
    let deals = [];
    let hasMore = true;
    let after = undefined;

    while (hasMore) {
      try {
        const response = await hubspotClient.crm.deals.basicApi.getPage(100, after);
        const filteredDeals = response.results.filter(deal => deal.properties.pipeline === pipelineId);
        console.log("este es: ", filteredDeals[0])
        deals = deals.concat(filteredDeals);
        hasMore = response.paging && response.paging.next;
        after = hasMore ? response.paging.next.after : undefined;
      } catch (error) {
        console.error('Error fetching deals:', error); 
        throw error;
      }
    }

    return deals;
  }

  function calculate7DayForecast(deals) {
    const now = new Date();
    const next7Days = new Date(now);
    next7Days.setDate(now.getDate() + 7);

    let next7DaysDeals = 0, next7DaysValue = 0;
    let forecastDeals = [];

    deals.forEach(deal => {
      const closeDate = new Date(parseInt(deal.properties.closedate));
      const amount = parseFloat(deal.properties.amount);

      if (closeDate <= next7Days) {
        next7DaysDeals++;
        next7DaysValue += amount;
        forecastDeals.push(deal.id);
      }
    });

    return {
      next7DaysDeals,
      next7DaysValue,
      forecastDeals
    };
  }

  async function createOrUpdateCustomObject(forecast, existingObjectId = null) {
    const now = new Date();
    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const properties = {
      date: now.toISOString().split('T')[0], // ISO date (YYYY-MM-DD)
      datetime: midnight.toISOString(), // ISO datetime (YYYY-MM-DDT00:00:00Z)
      deals_next_7_days: forecast.next7DaysDeals,
      revenue_next_7_days: forecast.next7DaysValue
    };

    try {
      let response;
      if (existingObjectId) {
        // Update existing custom object
        response = await hubspotClient.crm.objects.basicApi.update(objectTypeId, existingObjectId, { properties });
        console.log('Updated custom object:', response); // Debugging log
      } else {
        // Create new custom object
        response = await hubspotClient.crm.objects.basicApi.create(objectTypeId, { properties });
        console.log('Created custom object:', response); // Debugging log
        existingObjectId = response.body.id;
      }

      // Associate deals with the custom object
      for (const dealId of forecast.forecastDeals) {
        await hubspotClient.apiRequest({
          method: 'POST',
          path: `/crm/v4/objects/${objectTypeId}/${existingObjectId}/associations/default/deal/${dealId}`,
        });
      }

    } catch (error) {
      console.error('Error creating/updating custom object:', error); // Error log
      throw error;
    }
  }

  // Check for existing forecast object for today and update or create as needed
  async function checkAndCreateOrUpdateObject() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    const searchRequest = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'date',
              operator: 'EQ',
              value: today
            }
          ]
        }
      ],
      sorts: [
        {
          propertyName: 'hs_createdate',
          direction: 'DESCENDING'
        }
      ],
      properties: ['hs_createdate'],
      limit: 1,
      after: 0
    };

    try {
      // Search for existing forecast object for today
      const response = await hubspotClient.crm.objects.searchApi.doSearch(objectTypeId, searchRequest);
      const deals = await fetchPipelineData();
      const forecasts = calculate7DayForecast(deals);

      if (response.results && response.results.length > 0) {
        // Update existing object if found
        const existingObjectId = response.results[0].id;
        await createOrUpdateCustomObject(forecasts, existingObjectId);
      } else {
        // Create new object if none found
        await createOrUpdateCustomObject(forecasts);
      }
    } catch (error) {
      console.error('Error searching custom objects:', error); // Error log
      throw error;
    }
  }
  try {
    // Main process execution
    await checkAndCreateOrUpdateObject();
    callback(null, 'Forecast updated successfully');
  } catch (error) {
    /*callback(error);*/  
  console.log("errrererererror", error)
  }
};
