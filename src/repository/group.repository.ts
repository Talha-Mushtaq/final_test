import { groupModel } from "../model/group.model";
import {
  IGroupReqAddUserToGroup,
  IGroupReqcheckMessagesFromGroup,
  IGroupReqSave,
  IGroupReqsendMessageToGroup,
  IGroupReqSpecificeWordSearch,
  IGroupReqSpecificUserWordSearch,
} from "../type/request/group.request";

export class GroupRespository {
  constructor() {}
  createGroup(data: IGroupReqSave) {
    return new groupModel(data).save();
  }
  addUserToGroup(data: IGroupReqAddUserToGroup) {
    return groupModel.findByIdAndUpdate(
      { _id: data._id },
      { $push: { users: data.user } },
      { new: true }
    );
  }
  sendMessageToGroup(data: IGroupReqsendMessageToGroup) {
    return groupModel.findByIdAndUpdate(
      { _id: data._id },
      { $push: { messages: data.messages } },
      { new: true }
    );
  }
  checkMessagesFromGroup(data: IGroupReqcheckMessagesFromGroup) {
    return groupModel.findById({ _id: data._id }, { messages: 1 });
  }
  specificeWordSearch(data: IGroupReqSpecificeWordSearch) {
    let regex = new RegExp(data.word, "i");

    return groupModel.aggregate([
      {
        $project: {
          name: 1,
          messages: {
            $filter: {
              input: "$messages",
              as: "m",
              cond: {
                $regexMatch: {
                  input: "$$m.message",
                  regex: regex,
                },
              },
            },
          },
        },
      },
    ]);
  }

  specificUserWordSearch(data: IGroupReqSpecificUserWordSearch) {
    let regex = new RegExp(data.word, "i");

    return groupModel.aggregate([
      { $match: { "messages.id": { $eq: data.id } } },
      {
        $project: {
          name: 1,
          messages: {
            $filter: {
              input: "$messages",
              as: "m",
              cond: {
                $regexMatch: {
                  input: "$$m.message",
                  regex: regex,
                },
              },
            },
          },
        },
      },
    ]);
  }
}
