import api from "./api";

const createCollection = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/event/create_collection", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllAddonIcons = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/all_addonicons")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllCollections = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/all_collections")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createEventCard = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/event/create_eventcard", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getCollectionById = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/collection/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getEventCardById = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getEventCardInCollection = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/in_collection/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getLatestEventCards = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard_multi/latest")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllEventCards = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard_multi")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const deleteEventCardById = (id) => {
  return new Promise((resolve, reject) => {
    api
      .delete("/api/event/eventcard/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const buyTicket = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/event/eventcard/buy_ticket", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getBuyState = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard/buy_ticket/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

const userTickets = (data) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard_multi/user_tickets")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateUserTickets = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/event/eventcard_multi/user_tickets", {
        id: data.id,
        tokenURL: data.tokenURL,
        ipfsURL: data.ipfsURL,
        is_minted: data.is_minted,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateEventLike = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/event/eventcard_multi/update_like", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAvailableEvents = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard_multi/available_events")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const allTickets = (data) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/eventcard_multi/tickets")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export {
  createCollection,
  getAllCollections,
  getAllAddonIcons,
  getCollectionById,
  getEventCardInCollection,
  createEventCard,
  getEventCardById,
  getAllEventCards,
  getLatestEventCards,
  buyTicket,
  getBuyState,
  userTickets,
  updateUserTickets,
  updateEventLike,
  allTickets,
  getAvailableEvents,
  deleteEventCardById,
};
