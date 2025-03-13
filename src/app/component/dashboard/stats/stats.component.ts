import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  template: '    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">\n' +
    '      <h2 class="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Welcome to Your Trading Dashboard</h2>\n' +
    '      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">\n' +
    '        <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-6">\n' +
    '          <h3 class="text-xl font-semibold text-blue-400 mb-4">Market Overview</h3>\n' +
    '          <div class="space-y-2">\n' +
    '            <div class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">BTC/USD</span>\n' +
    '              <span class="text-green-500">$45,123.45 (+2.5%)</span>\n' +
    '            </div>\n' +
    '            <div class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">ETH/USD</span>\n' +
    '              <span class="text-red-500">$3,214.67 (-1.2%)</span>\n' +
    '            </div>\n' +
    '            <div class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">XRP/USD</span>\n' +
    '              <span class="text-green-500">$0.5678 (+0.8%)</span>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-6">\n' +
    '          <h3 class="text-xl font-semibold text-blue-400 mb-4">Portfolio Performance</h3>\n' +
    '          <div class="text-4xl font-bold text-black dark:text-white mb-2">$000</div>\n' +
    '          <div class="text-green-500">+$3,456.78 (2.8%)</div>\n' +
    '          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">Last updated: 5 minutes ago</div>\n' +
    '        </div>\n' +
    '        <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-6">\n' +
    '          <h3 class="text-xl font-semibold text-blue-400 mb-4">Recent Transactions</h3>\n' +
    '          <ul class="space-y-2">\n' +
    '            <li class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">Buy BTC</span>\n' +
    '              <span class="text-green-500">+0.1 BTC</span>\n' +
    '            </li>\n' +
    '            <li class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">Sell ETH</span>\n' +
    '              <span class="text-red-500">-2.5 ETH</span>\n' +
    '            </li>\n' +
    '            <li class="flex justify-between items-center">\n' +
    '              <span class="text-black dark:text-white">Buy XRP</span>\n' +
    '              <span class="text-green-500">+1000 XRP</span>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' ,
  styleUrl: './stats.component.css'
})
export class StatsComponent {

}
