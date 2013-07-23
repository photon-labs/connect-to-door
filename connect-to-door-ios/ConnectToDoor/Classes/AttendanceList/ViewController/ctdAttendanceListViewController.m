//
//  ctdAttendanceListViewController.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdAttendanceListViewController.h"
#import "ctdConstants.h"

@implementation ctdAttendanceListViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    ctdAttendanceListService *attendanceListService = [[ctdAttendanceListService alloc] init];
    [attendanceListService handleAttendanceListRequest:nil :nil :@"01-07-2013" :@"15-07-2013"];
    attendanceListService.delegate = self;
}

-(void)viewWillAppear:(BOOL)animated
{
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

-(void)didReceiveAttendanceListResponse:(NSMutableArray *)attendanceListArray
{

}

- (void)didReceiveAttendanceListErrorResponse:(NSError*)error;
{
    NSLog(@"ERROR RESPONSE : %@", error);
}
@end
