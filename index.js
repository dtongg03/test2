const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const file = './data2.json';

const isValidDate = (date) => {
    const startDate = moment('2023-01-01');
    const endDate = moment('2025-01-31');
    return date.isBetween(startDate, endDate, null, '[]');
};

const markCommit = async (date) => {
    const data = { date: date.format() };
    await jsonfile.writeFile(file, data);
    const git = simpleGit();
    await git.add(file);
    await git.commit(date.format(), {'--date': date.format()});
};

const makeCommits = async (n) => {
    const git = simpleGit();
    for (let i = 0; i < n; i++) {
        const randomWeeks = Math.floor(Math.random() * (52 * 4));
        const randomDays = Math.floor(Math.random() * 7);
        const randomDate = moment("2023-01-01")
            .add(randomWeeks, 'weeks')
            .add(randomDays, 'days');
        
        if (isValidDate(randomDate)) {
            console.log(`Creating commit: ${randomDate.format()}`);
            await markCommit(randomDate);
        } else {
            console.log(`Skipping date: ${randomDate.format()}`);
        }
    }
    console.log('Commits created');
    await git.push();
};

makeCommits(400);