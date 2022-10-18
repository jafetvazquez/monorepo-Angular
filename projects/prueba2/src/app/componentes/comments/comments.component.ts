import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentsService } from "../../../services/comments.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private commentsService: CommentsService) {
    this.activatedRoute.params.subscribe((params => {
      this.commentsService.Comentarios(params['id']).subscribe((data: any) => {
        this.comments = data;
      })
    }))
  }

  ngOnInit(): void {
  }

}
