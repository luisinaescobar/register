const { config } = require('dotenv');
const dataSource = require('./db/index')
const { makeServer } = require('./index');

async function main() {
    config()
    const server = makeServer();
    const isDBok = dataSource;
    if (isDBok) {
        server.listen(process.env.PORT, () => {
            console.log('Server is running...');
        });
    } else {
        console.log('failed to load DB')
    }
}

main();