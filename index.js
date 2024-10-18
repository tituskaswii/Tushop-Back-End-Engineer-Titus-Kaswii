const readline = require('readline');

// Job class to represent each job
class Job {
    constructor(startTime, endTime, profit) {
        this.startTime = this.convertTime(startTime); // Convert HHMM format to minutes
        this.endTime = this.convertTime(endTime); // Convert HHMM format to minutes
        this.profit = profit;
    }

    // Converts HHMM to minutes from 00:00 for easier comparisons
    convertTime(time) {
        const hours = parseInt(time.substring(0, 2));
        const minutes = parseInt(time.substring(2));
        return hours * 60 + minutes;
    }
}

// Factory class to handle the job selection process
class JobFactory {
    constructor(jobs) {
        this.jobs = jobs.sort((a, b) => a.endTime - b.endTime); // Sort jobs by endTime
        this.dp = new Array(this.jobs.length).fill(0);  // Store the max profit until each job
        this.selectedJobs = new Array(this.jobs.length).fill(false); // Track which jobs are selected
    }

    // Function to find the maximum profit by selecting non-overlapping jobs
    findMaxProfit() {
        const n = this.jobs.length;
        this.dp[0] = this.jobs[0].profit; // The max profit at the first job is its own profit

        // Helper function to find the last non-conflicting job
        const findLastNonConflict = (index) => {
            for (let i = index - 1; i >= 0; i--) {
                if (this.jobs[i].endTime <= this.jobs[index].startTime) {
                    return i;
                }
            }
            return -1;
        };

        // Fill the dp array with the maximum profits
        for (let i = 1; i < n; i++) {
            let includeProfit = this.jobs[i].profit;
            const lastNonConflict = findLastNonConflict(i);
            if (lastNonConflict !== -1) {
                includeProfit += this.dp[lastNonConflict];
            }
            this.dp[i] = Math.max(this.dp[i - 1], includeProfit);
        }

        return this.dp[n - 1];  // The last element contains the max profit John can earn
    }

    // Function to calculate remaining jobs and earnings for others
    calculateRemainingJobsAndEarnings() {
        const n = this.jobs.length;
        let johnEarnings = 0;

        // Backtrack to find which jobs were selected
        let i = n - 1;
        while (i >= 0) {
            if (i === 0 || this.dp[i] !== this.dp[i - 1]) {
                johnEarnings += this.jobs[i].profit;
                this.selectedJobs[i] = true; // Mark job as selected
                const lastNonConflict = this.findLastNonConflict(i);
                i = lastNonConflict; // Move to the last non-conflicting job
            } else {
                i--;
            }
        }

        const remainingJobsCount = this.selectedJobs.filter(selected => !selected).length;
        const remainingEarnings = this.jobs.reduce((acc, job, idx) => {
            if (!this.selectedJobs[idx]) {
                return acc + job.profit;
            }
            return acc;
        }, 0);

        return {
            remainingJobsCount,
            remainingEarnings
        };
    }

    // Helper function should be outside of calculateRemainingJobsAndEarnings
    findLastNonConflict(index) {
        for (let i = index - 1; i >= 0; i--) {
            if (this.jobs[i].endTime <= this.jobs[index].startTime) {
                return i;
            }
        }
        return -1;
    }
}

// Function to handle the input and execution flow
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let jobs = [];
    rl.question('Enter the number of Jobs\n', (n) => {
        const numJobs = parseInt(n);
        if (numJobs <= 0 || numJobs > 100) {
            console.log('Invalid number of jobs.');
            rl.close();
            return;
        }

        let jobData = [];
        let count = 0;
        rl.on('line', (input) => {
            jobData.push(input.trim());
            count++;
            // Once we've collected 3 pieces of info per job, push to the jobs array
            if (jobData.length === 3) {
                const job = new Job(jobData[0], jobData[1], parseInt(jobData[2]));
                jobs.push(job);
                jobData = []; // Reset for next job's input
            }

            if (count === numJobs * 3) {
                rl.close();
            }
        });

        rl.on('close', () => {
            const factory = new JobFactory(jobs);
            factory.findMaxProfit();
            const { remainingJobsCount, remainingEarnings } = factory.calculateRemainingJobsAndEarnings();

            // Output the result
            console.log('The number of tasks and earnings available for others');
            console.log(`Task: ${remainingJobsCount}`);
            console.log(`Earnings: ${remainingEarnings}`);
        });
    });
}

main();