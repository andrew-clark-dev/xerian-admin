"use client";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import React, { useState } from "react";

export default function DropdownWithIcon() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center dropdown-toggle gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
      >
        Account Menu
        <svg
          className={`duration-200 ease-in-out stroke-current ${
            isOpen ? "rotate-180" : ""
          }`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
            stroke=""
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        className="absolute left-0 top-full z-40 mt-2 w-full min-w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]"
        isOpen={isOpen}
        onClose={closeDropdown}
      >
        <ul className="flex flex-col gap-1">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                  fill=""
                />
              </svg>
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4861 3.5L13.5184 3.5C13.9235 3.5 14.2521 3.82851 14.2521 4.23377C14.2521 5.9529 16.1131 7.02795 17.6022 6.1682C17.953 5.96567 18.4016 6.08586 18.6042 6.43667L20.1205 9.0631C20.3232 9.41407 20.2029 9.86286 19.8519 10.0655C18.3628 10.9253 18.3627 13.0747 19.8519 13.9345C20.2029 14.1372 20.3231 14.5859 20.1205 14.9369L18.6041 17.5634C18.4016 17.9142 17.953 18.0344 17.6022 17.8318C16.1131 16.9721 14.2521 18.0471 14.2521 19.7663C14.2521 20.1715 13.9235 20.5 13.5184 20.5H10.486C10.0807 20.5 9.75206 20.1714 9.75206 19.766C9.75206 18.0461 7.89007 16.9717 6.40091 17.8314C6.0497 18.0342 5.60061 17.9139 5.39792 17.5628L3.88191 14.937C3.67927 14.586 3.79953 14.1372 4.15051 13.9346C5.63973 13.0748 5.6397 10.9253 4.1505 10.0655C3.79951 9.86282 3.67925 9.41401 3.88189 9.06303L5.39788 6.43725C5.60058 6.08617 6.04967 5.96581 6.40089 6.16858C7.89007 7.02836 9.75206 5.9539 9.75206 4.23399C9.75206 3.82862 10.0807 3.5 10.4861 3.5ZM13.5184 2L10.4861 2C9.25225 2 8.25206 3.00019 8.25206 4.23399C8.25206 4.79884 7.64038 5.15215 7.15089 4.86955C6.08237 4.25263 4.71584 4.61859 4.09885 5.68725L2.58285 8.31303C1.96599 9.38146 2.33208 10.7477 3.4005 11.3645C3.88972 11.647 3.88971 12.3531 3.40051 12.6355C2.33209 13.2524 1.96602 14.6186 2.58287 15.687L4.09888 18.3128C4.71587 19.3814 6.0824 19.7474 7.15091 19.1305C7.64039 18.8479 8.25206 19.2012 8.25206 19.766C8.25206 20.9998 9.25225 22 10.486 22H13.5184C14.7521 22 15.7521 20.9998 15.7521 19.7663C15.7521 19.2015 16.3634 18.8487 16.8522 19.1309C17.9205 19.7476 19.2864 19.3816 19.9032 18.3134L21.4195 15.6869C22.0364 14.6185 21.6703 13.2523 20.6019 12.6355C20.1127 12.3531 20.1127 11.647 20.6019 11.3645C21.6703 10.7477 22.0364 9.38152 21.4196 8.3131L19.9032 5.68667C19.2864 4.61842 17.9205 4.25241 16.8522 4.86917C16.3634 5.15138 15.7521 4.79856 15.7521 4.23377C15.7521 3.00024 14.7521 2 13.5184 2ZM9.66614 11.9999C9.66614 10.7103 10.7116 9.66493 12.0011 9.66493C13.2907 9.66493 14.3361 10.7103 14.3361 11.9999C14.3361 13.2895 13.2907 14.3349 12.0011 14.3349C10.7116 14.3349 9.66614 13.2895 9.66614 11.9999ZM12.0011 8.16493C9.88313 8.16493 8.16614 9.88191 8.16614 11.9999C8.16614 14.1179 9.88313 15.8349 12.0011 15.8349C14.1192 15.8349 15.8361 14.1179 15.8361 11.9999C15.8361 9.88191 14.1192 8.16493 12.0011 8.16493Z"
                  fill=""
                />
              </svg>
              Settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.9991 7.52507C10.9991 8.07736 11.4468 8.52507 11.9991 8.52507H12.0001C12.5524 8.52507 13.0001 8.07736 13.0001 7.52507C13.0001 6.97279 12.5524 6.52507 12.0001 6.52507H11.9991C11.4468 6.52507 10.9991 6.97279 10.9991 7.52507ZM12.0001 17.3714C11.5859 17.3714 11.2501 17.0356 11.2501 16.6214V10.9449C11.2501 10.5307 11.5859 10.1949 12.0001 10.1949C12.4143 10.1949 12.7501 10.5307 12.7501 10.9449V16.6214C12.7501 17.0356 12.4143 17.3714 12.0001 17.3714Z"
                  fill=""
                />
              </svg>
              Support
            </DropdownItem>
          </li>
          <li>
            <span className="my-1.5 block h-px w-full bg-gray-200 dark:bg-[#353C49]"></span>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.101 19.247C14.6867 19.247 14.351 18.9112 14.351 18.497L14.351 14.245H12.851V18.497C12.851 19.7396 13.8583 20.747 15.101 20.747H18.501C19.7436 20.747 20.751 19.7396 20.751 18.497L20.751 5.49609C20.751 4.25345 19.7436 3.24609 18.5009 3.24609H15.101C13.8583 3.24609 12.851 4.25345 12.851 5.49609V9.74501L14.351 9.74501V5.49609C14.351 5.08188 14.6867 4.74609 15.101 4.74609L18.5009 4.74609C18.9152 4.74609 19.251 5.08188 19.251 5.49609L19.251 18.497C19.251 18.9112 18.9152 19.247 18.501 19.247H15.101ZM3.25098 11.9984C3.25098 12.2144 3.34229 12.4091 3.48841 12.546L8.09508 17.1556C8.38788 17.4485 8.86275 17.4487 9.15574 17.1559C9.44872 16.8631 9.44887 16.3882 9.15607 16.0952L5.81141 12.7484L16.001 12.7484C16.4152 12.7484 16.751 12.4127 16.751 11.9984C16.751 11.5842 16.4152 11.2484 16.001 11.2484L5.81553 11.2484L9.15609 7.90554C9.44888 7.61255 9.44871 7.13767 9.15572 6.84488C8.86272 6.55209 8.38785 6.55226 8.09506 6.84525L3.52333 11.4202C3.35698 11.5577 3.25098 11.7657 3.25098 11.9984Z"
                  fill=""
                />
              </svg>
              Sign out
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
