// import kafka from 'kafka-node';

// const kafkaProducer = (app) => {
//   const client = new kafka.KafkaClient({ kafkaHost: '10.139.52.49:9092,10.139.52.57:9092,10.139.52.45:9092' });
//   const producer = new kafka.Producer(client, { partitionerType: 2 });

//   // const payloads = [{
//   //   topic: 'tac-flying-phoenix-user-message-2176',
//   //   messages: 'hello robin'
//   // }];

//   app.context.producer = producer;

//   producer.on('ready', () => {
//     // console.log('ready');
//   });

//   producer.on('error', () => {
//     // console.log(err);
//   });
// };

// const kafkaConsumer = (groupId = 'kafka-node-group') => {
//   const options = {
//     kafkaHost: '10.139.52.49:9092,10.139.52.57:9092,10.139.52.45:9092', // connect directly to kafka broker (instantiates a KafkaClient)
//     zk: undefined, // put client zk settings if you need them (see Client)
//     batch: undefined, // put client batch settings if you need them (see Client)
//     groupId,
//     sessionTimeout: 15000,
//     // An array of partition assignment protocols ordered by preference.
//     // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
//     protocol: ['roundrobin'],

//     // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
//     // equivalent to Java client's auto.offset.reset
//     fromOffset: 'latest', // default

//     // how to recover from OutOfRangeOffset error (where save offset is past server retention) accepts same value as fromOffset
//     outOfRangeOffset: 'earliest', // default
//     migrateHLC: false, // for details please see Migration section below
//     migrateRolling: true
//   };

//   // Or for a single topic pass in a string

//   const consumerGroup = new kafka.ConsumerGroup(options, 'tac-flying-phoenix-user-message-2176');
//   consumerGroup.on('message', (message) => {
//     console.log(groupId, ' : ', message);
//   });

//   consumerGroup.on('error', (message) => {
//     console.log(message);
//   });
// };

// module.exports = { kafkaProducer, kafkaConsumer };
