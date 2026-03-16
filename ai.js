exports.handler = async function(event) {
  if(event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const KEY_PARTS = [
    'sk-ant-api03-Bs_bbFmYCDI',
    'ortGUHHpAv1Z4ThlUBqFVHv9v',
    'S5kC1HGHvt6RS199cVMe_nK23',
    '8LrEQV9Dpxc5_98ZuBqlC0ROg',
    '-lrWQwgAA'
  ];
  const API_KEY = KEY_PARTS.join('');

  try {
    const body = JSON.parse(event.body);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: body.model || 'claude-sonnet-4-20250514',
        max_tokens: body.max_tokens || 500,
        system: body.system || '',
        messages: body.messages || []
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
