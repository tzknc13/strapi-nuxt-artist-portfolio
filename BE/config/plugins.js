module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      actionOptions: {
        upload: {},
        uploadStream: {},
      },
    },
  }
});