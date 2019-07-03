module Main where

import Network.EventSource
import Data.Maybe
import Control.Fold 
import Data.Number.Format (toString)
import Math (sqrt)
import Prelude
import Effect (Effect)
import Effect.Console (log)
import Control.Monad.Eff
import Control.Monad.Eff.Console


-- | using patern match
fib :: Int -> Int
fib n
  | n == 0 = 1
  | n == 1 = 1
  | n >  1 = fib (n - 2) + fib (n - 1)

-- | using guards
fib2 :: Int -> Int
fib2 n
  | n == 0 = 1
  | n == 1 = 1
  | n >  1 = fib2 (n - 2) + fib2 (n - 1)

-- | using case of
fib3 :: Int -> Int
fib3 n = case n of
    0 -> 1
    1 -> 1
    _ | n > 1 -> fib3 (n - 2) + fib3 (n - 1)

-- | > Q1.main
-- | 89
-- | 89
-- | 89
-- | unit
main:: forall a. Eff (console :: CONSOLE | a) Unit
main = do
  print $ fib 10
  print $ fib2 10
  print $ fib3 10