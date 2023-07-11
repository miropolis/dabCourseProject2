import * as userService from "../services/userService.js";

const getUserPostedRecently = async (user_uuid) => {
    const userTimeEntry = await userService.findUserPosted(user_uuid);
    let responseData = {
        seconds: 0,
        questionAdded: true,
    };
    if(userTimeEntry.length === 0) {
      await userService.writeUserPosted(user_uuid);
      return responseData;
    } else {
      // User is already in database
      const currentTime = await userService.getDatabaseTime();
      const timeDiff = currentTime[0].now - userTimeEntry[0].posted;
      const seconds = parseInt((timeDiff)/1000);
      if (seconds < 60) {
        // Time diff below 60 seconds, do not add question
        responseData.seconds = 60 - seconds;
        responseData.questionAdded = false;
        return responseData;
      } else {
        // start new delay
        await userService.updateUserPosted(user_uuid);
        return responseData;
      };
    };
};

export { getUserPostedRecently };