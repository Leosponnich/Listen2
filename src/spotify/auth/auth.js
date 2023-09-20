
const CLIENT_ID = 'feb8469a722140269123ab9f53988c75';
const CLIENT_SECRET = 'cea6f92ef79246b7b874921ddfbf82f8';
const URI = 'https://listen-six.vercel.app/';

export async function exchangeCodeForToken(authCode) {
  const authParameters = new URLSearchParams();
  authParameters.append('grant_type', 'authorization_code');
  authParameters.append('code', authCode);
  authParameters.append('redirect_uri', URI);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: authParameters.toString(),
    });

    if (!response.ok) {
      console.error('Error exchanging code for access token. Status:', response.status);
      throw new Error('Error exchanging code for access token');
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    throw error;
  }
}

export async function refreshhToken(refreshToken) {
  const authParameters = new URLSearchParams();
  authParameters.append('grant_type', 'refresh_token');
  authParameters.append('refresh_token', refreshToken);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: authParameters.toString(),
    });

    if (!response.ok) {
      console.error('Error refreshing token:', response.status);
      throw new Error('Error refreshing token');
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
