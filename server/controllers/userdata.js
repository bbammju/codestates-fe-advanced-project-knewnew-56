const { userData } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.

  try {
    const data = await userData.findAll({
      attributes: ["*"],
      raw: true,
      order: [["id", "desc"]],
      limit: 5,
    });
    if (!data) {
      return res.status(409).send({ message: "error" });
    } else {
      return res.status(201).json(data);
    }
  } catch (err) {
    return;
  }

  //res.status(409).send();
};
