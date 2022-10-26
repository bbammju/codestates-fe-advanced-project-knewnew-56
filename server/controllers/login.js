const { User } = require("../models");
const {
  generateAccessToken,
  sendAccessToken
} = require("./tokenFunctions");

module.exports = async (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달
  try {
    const { email, password } = req.body; //유저 정보
    const data = await User.findOne({
      where: { email: email, password: password },
    }); //일치하는 정보가 data 에

    if (!data) return res.status(404).send("invalid user");
    else {
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken);
      return res
        .status(200)
        .json({ data: accessToken, message: "ok" });
    }
  } catch (err) {
    return null;
  }

  //res.status(500).send('');
};
