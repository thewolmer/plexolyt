'use server';

import { formatDate } from 'date-fns';

const webhookUrl = process.env.REVALIDATION_LOG_WEBHOOK_URL;

export const sendRevalidationLog = async (reqUrl: string) => {
  try {
    const embed = {
      title: 'Revalidation Successful',
      fields: [
        {
          name: 'Authorization was successful',
          value: `Host: ${reqUrl}`,
          inline: false,
        },
        {
          name: 'Now',
          value: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss xxx'),
          inline: false,
        },
      ],
      footer: {
        text: 'sent via plexolyt.com',
      },
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Revalidation Log',
        avatar_url:
          'https://cdn.discordapp.com/attachments/935974650926731296/1210594772113170443/Avatar_and_Backdrop.png?ex=65eb213d&is=65d8ac3d&hm=96992b3b88b1f02596021b8ef7cc5b126bd2624f2cd3d2b246cd260c1fb7e0da&',
        embeds: [embed],
      }),
    });

    if (response.ok) {
      console.log('Revalidation Log Webhook sent successfully');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('Error sending Revalidation Log Webhook: ', error);
  }
};
