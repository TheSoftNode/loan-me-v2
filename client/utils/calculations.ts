export const calculateMonthlyPayment = (amount: number, rate: number, months: number): number =>
{
    const monthlyRate = rate / 100 / 12;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
};