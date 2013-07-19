//
//  ctdVoucherViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ctdVoucherViewController : UIViewController
@property (nonatomic, strong) IBOutlet UIButton *requestButton;
@property (nonatomic, strong) IBOutlet UIButton *reimbursement;

- (IBAction)didRequestClicked:(id)sender;
- (IBAction)didReimbursementClicked:(id)sender;
@end
