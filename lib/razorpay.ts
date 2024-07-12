import Razorpay from 'razorpay';

import { env } from '@/env';

export const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_API_ID,
  key_secret: env.RAZORPAY_API_SECRET,
});
