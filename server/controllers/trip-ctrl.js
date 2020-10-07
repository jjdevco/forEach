const Trip = require("../models/trip-model");

create = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a trip",
    });
  }

  try {
    const meansOfTransport = {
      SUBWAY: 0.033,
      CAR: 0.21,
      TRUCK: 0.249,
      MOTORCYCLE: 0.092,
      TRANSANTIAGO: 0.039,
      BUS: 0.012,
      LOCAL_PLANE: 0.279,
      INTERNATIONAL_PLANE: 0.179,
      WALK: 0,
    };

    const { distance, roundTrip, by, travelers } = body;

    const costPerPerson = ((transport, distance, roundTrip, travelers) => {
      let sub = transport * distance;

      if (roundTrip) sub = sub * 2;
      return (sub / travelers).toFixed(6);
    })(meansOfTransport[by], distance, roundTrip, travelers);

    const trip = new Trip({ ...body, costPerPerson });

    await trip.save();

    res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

getAll = async (req, res) => {
  try {
    await Trip.find({}, (error, trips) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }
      if (!trips.length) {
        return res.status(404).send({ message: "Trip not found" });
      }
      return res.status(200).send(trips);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
};
