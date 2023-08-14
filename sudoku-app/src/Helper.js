export function removeMatDots(mat) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            mat[row][col] = mat[row][col] == "." ? "" : mat[row][col];
        }
    }
}