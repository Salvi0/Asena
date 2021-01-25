import { EmojiResolvable, PermissionString } from 'discord.js';

interface IBot{
    readonly PREFIX_COMMAND: string
    readonly PERMITTED_ROLE_NAME: string
    readonly COOLDOWN_TIME: number
    readonly REQUIRED_PERMISSIONS: PermissionString[]
    readonly INVITE_URL: string
    readonly SUPPORT_SERVER: string
    readonly WEBSITE: string
    readonly CLIENT_ID: string
}

export const Bot: IBot = {
    PREFIX_COMMAND: '>>prefix',
    PERMITTED_ROLE_NAME: 'asena', // if there is no permission, this role is checked
    COOLDOWN_TIME: 5,
    REQUIRED_PERMISSIONS: [
        'SEND_MESSAGES',
        'ADD_REACTIONS',
        'VIEW_CHANNEL',
        'EMBED_LINKS',
        'READ_MESSAGE_HISTORY',
        'USE_EXTERNAL_EMOJIS'
    ],
    INVITE_URL: 'https://discord.com/oauth2/authorize?permissions=347200&scope=bot&client_id=716259870910840832&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCRgXhfs&response_type=code',
    SUPPORT_SERVER: 'https://discord.gg/CRgXhfs',
    WEBSITE: 'https://asena.xyz',
    CLIENT_ID: '716259870910840832'
}

interface IRabbitMQ{
    channels: {
        [key: string]: string
    }
}

export const RabbitMQ: IRabbitMQ = {
    channels: {
        premium: 'premium'
    }
}

export const Emojis = {
    GRAPH_EMOJI: '<:graph:716972905841426453>',
    CONFETTI_EMOJI: '<a:uwu:716956121289588736>', //<:confetti:713087026051940512>
    CONFETTI_REACTION_EMOJI: '\uD83C\uDF89',
    AGREE_EMOJI_ID: '721180088686870549',
    DISAGREE_EMOJI_ID: '721179958378233887',
    RUBY_EMOJI: '<a:ruby:721700215190454344>'
}

interface IRaffleLimits{
    readonly MIN_TIME: number
    readonly MAX_TIME: number
    readonly MAX_WINNER_COUNT: number
    readonly MAX_COUNT: number
    readonly MAX_COUNT_PREMIUM: number
    readonly MAX_SERVER_COUNT: number
    readonly MAX_ALLOWED_ROLE_COUNT: number
    readonly MAX_REWARD_ROLE_COUNT: number
}

export const RaffleLimits: IRaffleLimits = {
    MIN_TIME: 60,
    MAX_TIME: 60 * 60 * 24 * 60,
    MAX_WINNER_COUNT: 20,
    MAX_COUNT: 5,
    MAX_COUNT_PREMIUM: 8,
    MAX_SERVER_COUNT: 3,
    MAX_ALLOWED_ROLE_COUNT: 10,
    MAX_REWARD_ROLE_COUNT: 8
}

interface ISurveyLimits{
    readonly MIN_TIME: number
    readonly MAX_TIME: number
}

export const SurveyLimits: ISurveyLimits = {
    MIN_TIME: 60,
    MAX_TIME: 60 * 60 * 24 * 15
}

export const MAX_ANSWER_LENGTH = 5

export type Letter = 'a' | 'b' | 'c' | 'd' | 'e'

export interface ILetter{
    name: Letter,
    emoji: EmojiResolvable
}

export const Setup = {
    CANCEL_KEYWORDS: ['iptal', 'cancel', 'exit'],
    PHASE_SKIP_KEYWORDS: ['pas', 'skip', 'geç', 'gec']
}

export const LETTERS: ILetter[] = [
    {
        name: 'a',
        emoji: '🇦'
    },
    {
        name: 'b',
        emoji: '🇧'
    },
    {
        name: 'c',
        emoji: '🇨'
    },
    {
        name: 'd',
        emoji: '🇩'
    },
    {
        name: 'e',
        emoji: '🇪'
    }
] //allowed letters

export const TOP_GG_URL: string = 'top.gg'
export const DISCORD_BOTS_GG_URL: string = 'discord.bots.gg'
