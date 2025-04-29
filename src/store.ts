import { defineStore } from "pinia";
import dayjs from "dayjs";
import {generateShuffledArray, array2d} from './utils'

interface GameStore {
  isReady: boolean;
  isStart: boolean;
  isEnd: boolean;
  startTime: dayjs.Dayjs | undefined;
  endTime: dayjs.Dayjs | undefined;
  gameMatrix: number[][] | undefined;
  seed: number;
  nextNumber: number;
}

export const useGameStore = defineStore("game", {
  state: (): GameStore => ({
    isReady: false,
    isStart: false,
    isEnd: false,
    startTime: undefined,
    endTime: undefined,
    gameMatrix: undefined,
    seed: 0,
    nextNumber: 1,
  }),
  getters: {
    duration(): number {
      if (this.startTime && this.endTime) {
        return this.endTime.diff(this.startTime, "second", true);
      }
      return -1;
    }
  },
  actions: {
    generateGame(seed?: number) {
      if (seed) {
        this.seed = seed;
      } else {
        this.seed = Math.floor(Math.random() * 1000000);
      }
      const randomArray = generateShuffledArray(this.seed);
      this.gameMatrix = array2d(randomArray, 10);
      this.isReady = true;
      return this.seed;
    },
    startGame() {
      this.isStart = true;
      this.startTime = dayjs();
    },
    endGame() {
      this.endTime = dayjs();
      this.isEnd = true;
    },
    resetGame() {
      this.isReady = false;
      this.isStart = false;
      this.isEnd = false;
      this.startTime = undefined;
      this.endTime = undefined;
      this.gameMatrix = undefined;
      this.seed = 0;
      this.nextNumber = 1;
    },
    checkClick(row: number, col: number) {
      if (!this.gameMatrix || !this.isReady) return false;
      if (!this.isStart) this.startGame();
      if (this.gameMatrix[row][col] === this.nextNumber) {
        this.nextNumber++;
        if (this.nextNumber > 100) {
          this.endGame();
        }
        return true;
      }
      return false;
    }
  }
})