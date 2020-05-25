const whisperService = require("../../services/whisperService");

describe("getNewWhisper", () => {
  it("increases sentFromId by 1", () => {
    var whisper = {
      gameId: 1,
      message: "",
      sentFromId: 2,
      nextWhisperRecipientId: 0,
      whisperRecipients: [{}],
    };

    res = whisperService.getNewWhisper(whisper);

    expect(res.sentFromId).toEqual(3);
  });

  it("increases nextWhisperRecipientId by 1", () => {
    var whisper = {
      gameId: 1,
      message: "",
      sentFromId: 2,
      nextWhisperRecipientId: 1,
      whisperRecipients: [{}],
    };

    res = whisperService.getNewWhisper(whisper);

    expect(res.nextWhisperRecipientId).toEqual(2);
  });

  it("sets nextWhisperRecipientId to 0 when penultimate recipient", () => {
    var whisper = {
      gameId: 1,
      message: "",
      sentFromId: 1,
      nextWhisperRecipientId: 3,
      whisperRecipients: [
        {
          id: 0,
          url: "",
        },
        {
          id: 1,
          url: "",
        },
        {
          id: 2,
          url: "",
        },
        {
          id: 3,
          url: "",
        },
      ],
    };

    res = whisperService.getNewWhisper(whisper);

    expect(res.nextWhisperRecipientId).toEqual(0);
  });
});
