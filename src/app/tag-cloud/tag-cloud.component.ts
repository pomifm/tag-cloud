import {Component, OnInit, EventEmitter} from '@angular/core';
import {Tag} from './tag';
import {TagCloud} from './tag-cloud';
import {TagBadgeComponent} from './tag-badge/tag-badge.component';
import {TagCloudService} from './tag-cloud.service';

// template: `
// 	<div *ngIf="tagCloud">
// 		<div>{{tagCloud.max}} - {{sizeRatio}}</div>
// 		<div [style.width]="'100%'">
// 			<tag-badge *ngFor="let tag of tagCloud.tags" [tag]="tag" [sizeRatio]="sizeRatio" [showSize]="showSize" (selected)="onTagSelected($event)"></tag-badge>
// 		</div>
// 	</div>
// `,


@Component({
	selector: 'tag-cloud',
	templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.css'],
	inputs: ['text', 'maxWords', 'highlightFunction', 'ignoreFunction', 'maxSizeRatio','showSize'],
	outputs: ['selectedTag'],
	providers: [TagCloudService]
})
export class TagCloudComponent implements OnInit {
	public text: string;
	public maxWords: number = 20;
	public highlightFunction: (word: string) => boolean;
	public ignoreFunction: (word: string) => boolean;
	public showSize: boolean = true;
	public maxSizeRatio: number = 5;
	public selectedTag:EventEmitter<string> = new EventEmitter<string>();

	public tagCloud: TagCloud;
	public sizeRatio: number = 10;

	constructor(private _tagCloudService: TagCloudService) {}

	ngOnInit() {
		this.build();
	}

	public build() {
		this._tagCloudService.getTagCloudF(this.text, this.maxWords, this.highlightFunction, this.ignoreFunction).then(tagCloud => {
			this.tagCloud = tagCloud;
			this.sizeRatio = (this.maxSizeRatio * 100 - 100) / (this.tagCloud.max - 1);
		});
	}

	onTagSelected(tag :Tag ){
		this.selectedTag.emit(tag.name);
	}
}
