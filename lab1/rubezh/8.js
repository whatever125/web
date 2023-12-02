superagent
    .get("example.com/json")
    .set("Accept", "application/json")
    .serialize()
    .then((response) => {
        if (response.staus == 200) {
            const data = response.body;
            for (const key in data) {
                console.log(`Key: ${key}, Value: ${data[key]}`);
            }
        }else {
            console.error(`HTTP error code! Status: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error('Error fetching data:\n', error);
    });


$.ajax(
    type="GET",
    url="example.com",
    dataType="application/json",
    success=(data) => {
        let data = JSON.parse(data);
        for (const key of data) {
            console.log(`Key: ${key}, Value: ${data[key]}`);
        }
    }
)