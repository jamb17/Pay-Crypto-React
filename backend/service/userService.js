import User from "../models/User.js";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService.js";
import mailService from "./mailService.js";
import Merchant from "../models/Merchant.js";
import Donate from "../models/Donate.js";

class userService {

    convertEmail(email) {
        let localPart = email.split('@')[0];
        localPart = localPart.replace(/\./g, '');
        return localPart;
    }

    async registration(email, password) {
        const userExists = await User.findOne({
            email: email
        });
        if (userExists) {
            throw new Error('Account with this email is already exists');
        };
        const hashPass = await bcrypt.hash(password, 3);
        const code = mailService.sendVerificationCode(email);
        // const hashCode = bcrypt.hash(code, 3);
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        if (code) {
            const user = await User.create({
                email,
                nickname: this.convertEmail(email),
                password: hashPass,
                verificationCode: code,
                codeExpirationTime: expirationTime
            });
            return user;
        } else throw new Error('Something went wrong while sending email');

    };

    async completeRegistration(email, code) {
        try {
            const verifiedUser = await mailService.verifyCode(email, code);
            const tokens = tokenService.generateTokens({
                email: verifiedUser.email,
                id: verifiedUser._id
            });
            await tokenService.saveToken(verifiedUser._id, tokens.refreshToken);
            return {
                verifiedUser,
                ...tokens
            };
        } catch (err) {
            throw err;
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({
                email: email
            });
            if (!user) {
                throw new Error('No user with this e-mail address was found');
            }
            const passEquals = await bcrypt.compare(password, user.password);
            if (!passEquals) {
                throw new Error('Wrong password')
            }
            const tokens = tokenService.generateTokens({
                email: user.email,
                id: user._id
            });
            await tokenService.saveToken(user._id, tokens.refreshToken);
            return {
                user,
                ...tokens
            }
        } catch (err) {
            throw err;
        }
    }

    async getUserData(accessToken, email) {
        try {
            const validToken = tokenService.validateAccessToken(accessToken);
            if (!accessToken || !validToken || !email) {
                throw new Error('Unauthorized Error');
            };
            const user = await User.findOne({
                email: email
            });
            const merchant = await Merchant.find({
                user: user._id
            });
            const donate = await Donate.find({user: user._id})
            const data = {
                nickname: user.nickname,
            };
            if (user.avatar) data.avatar = user.avatar;
            if (merchant) {
                let userMerchantData = [];
                merchant.forEach(e => {
                    userMerchantData.push({
                        name: e.name,
                        avatar: e.avatar || '',
                        id: e._id
                    })
                });
                data.merchant = userMerchantData;
            }
            if (donate) {
                let userDonateData = [];
                donate.forEach(e => {
                    userDonateData.push({
                        name: e.name,
                        avatar: e.avatar || '',
                        id: e._id
                    })
                });
                data.donate = userDonateData;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Unauthorized Error');
        };
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log(!userData, !tokenFromDb);
        if (!userData || !tokenFromDb) {
            throw new Error('Unauthorized Error');
        };
        const user = await User.findById(userData.id);
        const tokens = tokenService.generateTokens({
            email: user.email,
            id: user._id
        });
        await tokenService.saveToken(user._id, tokens.refreshToken);
        return {
            user,
            ...tokens
        };
    }

    async createMerchantAccount(email, name, file, accessToken) {
        const validToken = tokenService.validateAccessToken(accessToken);
        if (!accessToken || !validToken || !email) {
            throw new Error('Unauthorized Error');
        };
        const accExists = await Merchant.findOne({
            name: name
        });
        if (accExists) {
            throw new Error('Account with this name already exists')
        };
        try {
            const user = await User.findOne({
                email: email
            });
            let avatarBuffer = null;
            let avatarContentType = null;
            if (file) {
                avatarBuffer = file.buffer;
                avatarContentType = file.mimetype;
            };
            const account = await Merchant.create({
                name: name,
                avatar: avatarBuffer,
                avatarContentType: avatarContentType,
                user: user._id
            });
            return account;
        } catch (e) {
            throw e
        }
    }

    async createDonateAccount(email, name, file, accessToken) {
        const validToken = tokenService.validateAccessToken(accessToken);
        if (!accessToken || !validToken || !email) {
            throw new Error('Unauthorized Error');
        };
        const accExists = await Merchant.findOne({
            name: name
        });
        if (accExists) {
            throw new Error('Account with this name already exists')
        };
        try {
            const user = await User.findOne({
                email: email
            });
            let avatarBuffer = null;
            let avatarContentType = null;
            if (file) {
                avatarBuffer = file.buffer;
                avatarContentType = file.mimetype;
            };
            const account = await Donate.create({
                name: name,
                avatar: avatarBuffer,
                avatarContentType: avatarContentType,
                user: user._id
            });
            return account
        } catch (e) {
            throw e
        }
    }

    async changePassword(email, oldPassword, newPassword, accessToken) {
        try {
            const validToken = tokenService.validateAccessToken(accessToken);
            if (!accessToken || !validToken || !email) {
                throw new Error('Unauthorized Error');
            };
            const user = await User.findOne({
                email: email
            });
            const passEquals = await bcrypt.compare(oldPassword, user.password)
            if (!passEquals) {
                throw new Error('Wrong password')
            }
            const hashPass = await bcrypt.hash(newPassword, 3);
            await User.updateOne(
                { email: email },
                { $set: { password: hashPass } }
            )
            return
        } catch(e) {
            throw e
        }
    }

    async changeAvatar (email, accessToken, file) {
        try {
            const validToken = tokenService.validateAccessToken(accessToken);
            if (!accessToken || !validToken || !email) {
                throw new Error('Unauthorized Error');
            };
            if (file) {
                await User.updateOne(
                    { email: email },
                    { $set: {
                        avatar: file?.buffer || '',
                        avatarContentType: file?.mimetype || ''
                }})
            } else {
                await User.updateOne(
                    { email: email },
                    { $unset: {
                        avatar: '',
                        avatarContentType: ''
                }})
            }
            return
        } catch (e) {
            throw e;
        }
    }

    async changeNickname (email, accessToken, nickname) {
        try {
            const validToken = tokenService.validateAccessToken(accessToken);
            if (!accessToken || !validToken || !email) {
                throw new Error('Unauthorized Error');
            }; 
            await User.updateOne(
                {
                    email: email
                },
                {
                    $set: {
                        nickname: nickname
                    }
                }
            )
            return
        } catch (e) {
            throw e
        }
    }

};

export default new userService();