const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
  axios.post.mockResolvedValue("ok");
});

afterEach(() => {
  axios.post.mockReset();
});

describe("/whipser", () => {
  it("should shoud return 200 OK", async () => {
    var whisper = {
      gameId: 1,
      message: "",
      sentFromId: 2,
      nextWhisperRecipientId: 0,
      whisperRecipients: [
        {
          id: 0,
          url: "https://someurl.com/whisper",
        },
      ],
    };

    const res = await request(app).post("/whisper").send(whisper);

    expect(res.statusCode).toEqual(200);
  });

  it("calls the next whishper recipient", async () => {
    var nextWhisperRecipientUrl = "https://someurl2.com/whisper";
    var whisper = {
      gameId: 1,
      message: "",
      sentFromId: -1,
      nextWhisperRecipientId: 1,
      whisperRecipients: [
        {
          id: 0,
          url: "https://someurl.com/whisper",
        },
        {
          id: 1,
          url: nextWhisperRecipientUrl,
        },
      ],
    };

    // Act
    const res = await request(app).post("/whisper").send(whisper);

    var requestUrl = axios.post.mock.calls[0][0];
    expect(requestUrl).toEqual(nextWhisperRecipientUrl);
  });
});
