let webPush = require("web-push");

const vapidKeys = {
	publicKey:
		"BMtmfCH2FIG9K_cXUtCQQYRjV0ECVkxuPLePPpvjLmnUjApEnuJGMQfQjw3adBaHsZzoGdgBPc_Pq_AFl63OlqQ",
	privateKey: "o0JRfJDvJyGTb_XwnIupyjKmZntGShONMW7-p_F_ZDQ",
};

webPush.setVapidDetails(
	"mailto:example@yourdomain.org",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

let pushSubscription = {
	endpoint:
		"https://fcm.googleapis.com/fcm/send/futZr2-b438:APA91bHSFnM3s9wlJ3-vxQIsfBIeNlFwLjEH6TNNRBw_MuZrOOlsCeaplWtDWDUkNCnhL_88UixYELYhoQWDTzvXvrJZhhoSzxlz_iMm9bLHLesz78hMi1IJ9lvbDt488U_3Q6i483bA",
	keys: {
		p256dh:
			"BJnw35ekqEDh1EWqnqzqK5VgTUayoDgt2AkGVD5NNyl8yQ7cfFmj2236lb/JHUMC3ferZz5/fEbrzUXaTPWZ/LA=",
		auth: "TX70gma+1u/3NgzY4RiOaw==",
	},
};
let payload = "Push Notification from Football Apps";

let options = {
	gcmAPIKey: "810879853303",
	TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
