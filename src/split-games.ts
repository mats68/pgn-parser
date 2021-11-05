const normalizeLineEndings = (str: string, normalized = '\n'): string =>
    str.replace(/\r?\n/g, normalized);

type TagString = string
type PgnString = string
type SplitGame = { tags: TagString, pgn: PgnString, all: string }

export const split = function(input, options) {
    // let result = parser.parse(input, options)
    let result = normalizeLineEndings(input).split("\n\n")
    let res = []
    let g: SplitGame = { tags: '', pgn: '', all: ''}
    result.forEach(function (part) {
        if (part.startsWith('[')) {
            g.tags = part
        } else if (part) {
            g.pgn = part
            let game = g.tags ? g.tags + "\n\n" + g.pgn : g.pgn
            g.all = game
            res.push(g)
            g = { tags: '', pgn: '', all: '' }
        }
    })
    return res
}