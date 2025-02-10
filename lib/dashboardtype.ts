
export  interface ChartMainData {
    [key: string]: number; // รองรับค่าต่างๆ ที่มีจำนวน
  }
  
export interface ChartData {
    occupation: ChartMainData;
    position: ChartMainData;
    benefit: ChartMainData;
    province: ChartMainData;
  }
  