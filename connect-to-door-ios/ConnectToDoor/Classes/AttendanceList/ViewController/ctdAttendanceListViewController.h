//
//  ctdAttendanceListViewController.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdBaseViewController.h"
#import "ctdAttendanceListService.h"
#import "DropDownView.h"

@interface ctdAttendanceListViewController : ctdBaseViewController <AttendanceListServiceDelegate, DropDownViewDelegate> {
    
	DropDownView *dropDownView;
	IBOutlet UITableView *attendanceTableView;
    NSMutableArray *attendanceContentArray;
}

@property (nonatomic, strong) IBOutlet UILabel *searchOptionLabel;
@property (nonatomic, strong) IBOutlet UITextField *dateStartText;
@property (nonatomic, strong) IBOutlet UITextField *dateEndText;
@property (nonatomic, strong) IBOutlet UITextField *searchKeyText;
@property (nonatomic, strong) IBOutlet UIButton *searchOptionButton;
@property (nonatomic, strong) IBOutlet UIButton *dateStartButton;
@property (nonatomic, strong) IBOutlet UIButton *dateEndButton;
@property (nonatomic, strong) IBOutlet UIButton *searchButton;

- (IBAction)didDateStartClicked:(id)sender;
- (IBAction)didDateEndClicked:(id)sender;
- (IBAction)didSearchOptionClicked:(id)sender;
- (IBAction)didSearchClicked:(id)sender;


@end
