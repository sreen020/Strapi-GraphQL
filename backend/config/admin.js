module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fc9b1d7b3f9ab2560d4c908b1310542d'),
  },
});
