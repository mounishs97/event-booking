var seeder = require('mongoose-seed');
var moment = require('moment');
 
console.log(process.env)

let username = process.env.mongoUsername;
let password = process.env.mongoPassword;
let database = process.env.mongoDatabase;

let dbhost = process.env.mongoHost;
let dbport = process.env.mongoPort;

// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Event',
        'documents': [
            {
                'name': 'Event1',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event2',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event3',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event4',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event5',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event6',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
            {
                'name': 'Event7',
                'endDate': '23/5/2020',
                'pictureUrl': 'https://images.pexels.com/photos/7648467/pexels-photo-7648467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'noOfSeats': 23
            },
        ]
    }
];

console.log(`mongodb://${username}:${password}@${dbhost}:${dbport}/${database}`);

// Connect to MongoDB via Mongoose
seeder.connect(`mongodb://${username}:${password}@${dbhost}:${dbport}/${database}`, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'models/event.js'
  ]);

  for(let obj of data){
      if(obj.model === 'Event'){
        obj = obj.documents.map((ele) => {
            ele['endDate'] = moment(ele['endDate'], "DD/MM/YYYY").toDate();
            return ele;
        });
      }
  }
 
  // Clear specified collections
  seeder.clearModels(['Event'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});