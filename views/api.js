const api = {
    async showListRestaurants(skip){
        try {
            const res = await fetch(
                `${process.env.MONGODB_URI}/posts?skip=${skip}`,
                {
                    method : "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            return await res.json();
        } catch(err) {
            throw new Error(err);
        }
    }
}

export {api};