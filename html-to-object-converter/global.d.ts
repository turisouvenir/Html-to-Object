declare namespace NodeJS {
    interface Global {
      describe: (name: string, callback: () => void) => void;
      it: (name: string, callback: () => void) => void;
      expect: any; // Use the 'any' type for expect to avoid type issues
    }
  }
  