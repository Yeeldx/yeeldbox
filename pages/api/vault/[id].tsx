export default function handler(req, res) {
    fetch("https://yeeldx.github.io/data/vaults.json")
        .then(response => response.json())
        .then((result) => {
            let vault = result.filter((value, index) => {
                if (value.address == req.query.id) {
                    return value;
                }
            })[0];

            res.status(200).json({data: vault})
        })
}