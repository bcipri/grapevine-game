const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
  axios.post.mockResolvedValue("ok");
  axios.get.mockResolvedValue({data:[]});
});

afterEach(() => {
  axios.post.mockReset();
});

describe("/whisper", () => {
  it("should shoud return 200 OK", async () => {
    const whisper = {
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

  it("calls url of the next whishper recipient", async () => {
    const nextWhisperRecipientUrl = "https://someurl2.com/whisper";
    const whisper = {
      gameId: 1,
      message: "test end",
      sentFromId: 1 ,
      nextWhisperRecipientId: 1,
      whisperRecipients: [
        {
          id: 0,
          url: "https://myurl.com/",
        },
        {
          id: 1,
          url: nextWhisperRecipientUrl,
        },
      ],
    };

    // Act
    await request(app).post("/whisper").send(whisper);

    const requestUrl = axios.post.mock.calls[0][0];
    expect(requestUrl).toEqual(nextWhisperRecipientUrl);
  });
});
