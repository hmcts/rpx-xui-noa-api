import pino from 'pino';

const l = pino({
    name: `rpx-xui-noa-api`,
    level: `debug`,
});

export default l;
