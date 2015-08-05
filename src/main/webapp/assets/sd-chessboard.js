(function(){
    var chessboard = function(converter) {
        return [
            {
              type    : 'lang',
              regex   : '\\{(\\w+\\/\\w+\\/\\w+\\/\\w+\\/\\w+\\/\\w+\\/\\w+\\/\\w+)\\}',
              replace : function(match, fen) {
                  return '<div class="board" id="' + fen + '"></div>';
              }
            }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.chessboard = chessboard; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = chessboard;
}());
