export function calculateMinutesAgo(createdAt: string): number {
    const createdAtDate = new Date(createdAt);
    const currentTime = new Date();
  
    const differenceMilliseconds = currentTime.getTime() - createdAtDate.getTime();

    return Math.round(differenceMilliseconds / (1000 * 60));
  }
  