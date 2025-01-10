import BASE_URL from "./baseURL";

const launchGame = (game) => async (e) => {
 e.preventDefault();
  const auth = localStorage.getItem("token");
  if(!auth) {
    window.location.href = "/login";
  }
  const inputData = {
    game_code: game,
    launch_demo: false
  };

  try {
    const response = await fetch(`${BASE_URL}/GameLogin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      if(response.status === 401) {
        window.location.href = "/login";
      }
      throw new Error("Launch Game failed");
    }

    const data = await response.json();
    window.location.href = data.message.url;
    // window.open(data.message.url, "_blank");
    // console.log("Launch Game success");
  } catch (error) {
    console.error("Launch Game error:", error);
  }
};

export default launchGame;