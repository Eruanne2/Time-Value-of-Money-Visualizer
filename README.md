# Time-Value-of-Money-Visualizer

Check out the live version [here](https://eruanne2.github.io/Time-Value-of-Money-Visualizer/)!

## Background
The Time Value of Money (TVM) calculator is a common tool used to calculate the effects of compounding interest on a monetary balance. While there are many variations depending on the company that offers it and the type of user that is expected to use it, there are 6 basic input fields that most TVM calculators share.
* the interest rate
* the length of time
* how often the interest is compounded
* the starting balance
* monthly payments applied to the balance (positive or negative)
* the final balance

Often the calculator is flexible such that the user may leave any one of these inputs blank and its value will be calculated based on the other 5 inputs. For example, the most intuitive way to use the calculator is to provide an interest rate, length of time, compounding period, starting balance, and payments, and have the calculator provide the final balance. However, the user may instead provide the length of time, compounding period, starting balance, monthly payments, and final balance, and the calculator will provide an interest rate that satisfies these conditions.

<div align="center">
  <img src="https://github.com/Eruanne2/Time-Value-of-Money-Visualizer/blob/main/images/tvm-example-3.png" height="170"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/Eruanne2/Time-Value-of-Money-Visualizer/blob/main/images/tvm-example-2.png" height="170"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/Eruanne2/Time-Value-of-Money-Visualizer/blob/main/images/tvm-example-1.png" height="170"/>
</div>

My TVM Visualizer will go a step beyond a simple input and output of numbers by displaying a clean and easy-to-read graph that animates the growth of the money over time. The user will easily be able to understand how the final balance is divided among the starting balance, the payments, and the interest. The placement of a slider below the graph will also allow the user to easily roll back time so that they can see this breakdown at any point throughout the lifetime of the balance.

## Technical Overview
This calculator is created purely from Vanilla JS, HTML, and CSS. The only dependency used is ReCharts.
