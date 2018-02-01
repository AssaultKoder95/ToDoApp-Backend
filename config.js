module.exports = Object.freeze({
  PORT: 8900,
  HOST_DEV: 'localhost',
  LOCAL_DB_URL: 'mongodb://localhost:27017/todoDB',
  RESPONSE_CODE: {
    SUCCESS: 200,
    UNABLE_TO_PERFORM: 405,
    CREATED: 201,
    ACCEPTED:202
  },
  RESPONSE_SUCCESS_OBJECT:{
    name: undefined,
    body: undefined,
    createdAt: undefined,
  }
});
