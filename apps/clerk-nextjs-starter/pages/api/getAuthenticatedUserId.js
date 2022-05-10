import { withSession } from '@clerk/nextjs/api';

export default withSession((req, res) => {
  console.log('request', req);
  res.statusCode = 200;
  if (req.session) {
    res.json({ id: req.session });
  } else {
    res.json({ id: null });
  }
});
