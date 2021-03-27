import { Emojis } from '../Constants';

const confEmojiLen = Emojis.CONFETTI_EMOJI.length
const validateRaffleText = (text: string) => {
    text = text.trim()
    return (
        text.length >= confEmojiLen * 2 &&
        text.substr(0, confEmojiLen) == Emojis.CONFETTI_EMOJI &&
        text.substr(text.length - confEmojiLen, confEmojiLen) == Emojis.CONFETTI_EMOJI
    )
}

export {
    validateRaffleText
}
