const delay = (time: number): Promise<undefined> => new Promise((resolve) => setTimeout(resolve, time));

export default delay;
