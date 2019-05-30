using System;
using System.Collections.Generic;
using System.Text;

namespace DSA
{
    public static class MergeSort
    {
        public static void Sort(IList<int> list)
        {
            int[] helper = new int[list.Count];
            mergeSort(list, helper, 0, list.Count - 1);
        }

        private static void mergeSort(IList<int> list, IList<int> helper, int low, int high)
        {
            if(low < high)
            {
                int middle = low + ((high - low) / 2);
                mergeSort(list, helper, low, middle);
                mergeSort(list, helper, middle + 1, high);
                merge(list, helper, low, middle, high);
            }
        }

        private static void merge(IList<int> list, IList<int> helper, int low, int middle, int high)
        {
            for(int i = low; i <= high; i++)
            {
                helper[i] = list[i];
            }

            int left = low;
            int right = middle + 1;
            int current = low;

            while(left <= middle && right <= high)
            {
                if(helper[left] <= helper[right])
                {
                    list[current] = helper[left];
                    left++;
                }
                else
                {
                    list[current] = helper[right];
                    right++;
                }
                current++;
            }

            int remaining = middle - left;
            for(int i = 0; i <= remaining; i++)
            {
                list[current + i] = helper[left + i];
            }
        }
    }
}
