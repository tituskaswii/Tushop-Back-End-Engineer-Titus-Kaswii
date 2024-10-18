Here's a README file, explaining my work:

---

# Job Selection App - Coding Assignment

### Introduction

This repository contains the solution to the coding challenge provided for the Senior Back-End Engineer role at Tushop. The challenge required developing a program to select non-overlapping jobs from a given list to maximize profit. The task also involved computing the remaining jobs and their earnings after the optimal selection is made.

---

## Problem Overview

The task was to implement a solution where:
- We are given a list of jobs, each with a **start time**, **end time**, and **profit**.
- The employee John must select jobs such that he maximizes his earnings, but he can only work on **non-overlapping jobs** (one job at a time).
- The output should display how many jobs and how much earnings are left for other employees after John picks his jobs.

### Input
- The number of jobs (`n`).
- For each job, its start time, end time (both in HHMM format), and profit.

### Output
- The number of jobs and the total earnings available for other employees after John makes his selection.

---

## Approach

### Job Representation

I started by designing a `Job` class to represent each job with the following properties:
- **startTime**: Converted from HHMM to minutes from midnight for easy time comparison.
- **endTime**: Similarly, converted to minutes from midnight.
- **profit**: The profit associated with the job.

### Dynamic Programming Solution

The key to solving this problem is dynamic programming. The challenge resembles the well-known **Weighted Interval Scheduling Problem**, where the objective is to select the maximum profit of non-overlapping intervals. Here's the approach I followed:

1. **Sorting Jobs by End Time**: 
   - To facilitate the selection of non-overlapping jobs, I first sorted the jobs based on their end times. This ensures that when evaluating whether to take a job, the jobs before it are already processed.

2. **Using Dynamic Programming**:
   - I created a `dp[]` array where `dp[i]` holds the maximum profit up to job `i`.
   - For each job `i`, I evaluated two choices:
     - Either John skips the job and the maximum profit remains `dp[i-1]`.
     - Or John takes the job, and the profit becomes the sum of the current job’s profit and the profit of the last non-conflicting job.
   - The transition formula is:
     
     dp[i] = max(dp[i-1], job[i].profit + dp[findLastNonConflict(i)])
     

3. **Finding Non-Conflicting Jobs**:
   - A helper function `findLastNonConflict(i)` was implemented to find the most recent job before job `i` that does not conflict with it (i.e., its end time is before or at the start time of job `i`).

4. **Backtracking to Identify Selected Jobs**:
   - After populating the `dp[]` array, I backtracked through the jobs to determine which ones John selected to achieve the maximum profit. The remaining jobs and their profits were then calculated for the other employees.

---

## Code Breakdown

### `Job` Class:
- **convertTime(time)**: Converts the job’s start and end times from HHMM format to minutes from midnight to simplify comparison.

### `JobFactory` Class:
- **findMaxProfit()**: Implements the dynamic programming solution that computes the maximum profit John can achieve.
- **calculateRemainingJobsAndEarnings()**: Backtracks through the `dp[]` array to identify the jobs John selects and computes how many jobs and how much earnings are left for other employees.
- **findLastNonConflict()**: Finds the last non-conflicting job for a given job to ensure that selected jobs do not overlap.

### Input Handling:
- The program uses `readline` to gather input, where the user inputs the number of jobs followed by the start time, end time, and profit for each job.

---

## Input/Output Format

### Input:
1. The first line contains the number of jobs (`n`).
2. The next `3n` lines contain details of each job in the format:
   - Start Time (HHMM)
   - End Time (HHMM)
   - Profit (integer)

### Output:
- The number of tasks and total earnings available for the other employees.

### Sample Input:

Enter the number of Jobs
3
0900
1030
100
1000
1200
500
1100
1200
300


### Sample Output:

The number of tasks and earnings available for others
Task: 2
Earnings: 400


---

## Backtracking Logic

After the dynamic programming table (`dp[]`) is filled with the maximum profits, I backtrack to determine which jobs were part of John’s optimal selection. These jobs are then marked as "selected" by John. Any jobs that were not selected are considered left for other employees.

The backtracking ensures that:
- We can precisely calculate how many jobs remain for others.
- The total earnings left for others can be summed up efficiently.

---

## Conclusion

This solution efficiently solves the problem by using dynamic programming to compute the optimal job selection for John while ensuring that no jobs overlap. The solution also calculates the remaining jobs and their profits for other employees. The implementation is scalable given the problem's constraints and runs efficiently even for the maximum input size.

I’ve tested the program against the provided sample inputs, and the results match the expected outputs.

---

Feel free to explore the repository and run the solution by following the instructions below!!

### Running the Program

1. Clone the repository.
2. Navigate to the project directory.
3. Run the program using:

   RUN "npm install" THEN
       "node index.js"


Ensure you input the job details as prompted by the program.

---

This README provides a detailed overview of my solution, explaining the approach and dynamic programming logic used to solve the problem.